import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
  code: string;
};
function CopyButton({ code }: Props) {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [canCopy, setCanCopy] = useState(true);
  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(code);
    setCanCopy(false);
    setTimeout(() => {
      setCanCopy(true);
    }, 1000);
  };
  return (
    <button className="absolute cursor-pointer top-1 right-[10px]">
      <CopyToClipboard text={code} onCopy={copyCode}>
        <div>{canCopy ? <CopyOutlined /> : <CheckOutlined />}</div>
      </CopyToClipboard>
    </button>
  );
}

export default CopyButton;
