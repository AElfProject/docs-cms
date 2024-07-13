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

const docSearchConfig: DocSearchProps = {
  typesenseCollectionName: process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME!,
  typesenseSearchParameters: {},
  typesenseServerConfig: {
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_DOCSEARCH_APP_HOST!,
        port: 443,
        protocol: "https",
      },
    ],
    apiKey: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY!,
  },
};

export default function Search() {
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | null>(null);

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
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="w-full flex-1 md:w-auto md:flex-none">
      <DocSearchButton ref={searchButtonRef} onClick={onOpen} />
      {isOpen &&
        createPortal(
          <DocSearchModal {...docSearchConfig} initialScrollY={0} />,
          document.body
        )}
    </div>
  );
}
