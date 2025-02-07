import { memo } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import ReactMarkdown from "react-markdown";

interface FortuneResultProps {
  completion: string;
  error: string | null;
  isLoading: boolean;
  onStop: () => void;
  onBack: () => void;
}

const FortuneResult = memo(function FortuneResult({
  completion,
  error,
  isLoading,
  onStop,
  onBack,
}: FortuneResultProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-bold">算命结果</h2>
        <div className="flex items-center gap-2">
          {completion.length > 0 && isLoading && (
            <Button variant="flat" onPress={onStop}>
              停止
            </Button>
          )}
          <Button isDisabled={isLoading} variant="flat" onPress={onBack}>
            返回表单
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="whitespace-pre-wrap">
          {error ? (
            <p className="mt-2 text-sm text-red-500">发生了错误：{error}</p>
          ) : completion.length > 0 ? (
            <ReactMarkdown>{completion}</ReactMarkdown>
          ) : (
            <div className="flex items-center gap-2">
              <Spinner color="white" size="sm" />
              正在算命中...
            </div>
          )}
        </div>
      </div>
    </Card>
  );
});

export default FortuneResult;
