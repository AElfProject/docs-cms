"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  DocSearchModal,
  DocSearchProps,
  DocSearchButton,
  useDocSearchKeyboardEvents,
} from "typesense-docsearch-react";

import "typesense-docsearch-css";
import { searchConfigSchema } from "@/services/search-config-schema";

export default function Search() {
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | null>(null);
  const [docSearchConfig, setDocSearchConfig] = useState<DocSearchProps>();

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    (event: KeyboardEvent) => {
      setIsOpen(true);
      setInitialQuery(event.key);
    },
    [setIsOpen, setInitialQuery]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/search`);
      const data = await res.json();

      const config = searchConfigSchema.parse(data);

      const docSearchConfig: DocSearchProps = {
        typesenseCollectionName: config.index,
        typesenseSearchParameters: {},
        typesenseServerConfig: {
          nodes: [
            {
              host: config.host,
              port: 443,
              protocol: "https",
            },
          ],
          apiKey: config.apikey,
        },
        initialQuery: initialQuery || undefined,
      };

      setDocSearchConfig(docSearchConfig);
    })();
  }, [initialQuery]);

  return (
    <div className="md:w-full md:flex-1 w-auto flex-none">
      <DocSearchButton ref={searchButtonRef} onClick={onOpen} />
      {isOpen &&
        docSearchConfig &&
        createPortal(
          <DocSearchModal
            {...docSearchConfig}
            initialScrollY={0}
            onClose={onClose}
          />,
          document.body
        )}
    </div>
  );
}
