import { memo } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import Link from "next/link";

interface APISettingsCardProps {
  isSubmitting: boolean;
  isLoading: boolean;
}

const APISettingsCard = memo(function APISettingsCard({
  isSubmitting,
  isLoading,
}: APISettingsCardProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">API 设置</h2>
      <Input
        description={
          <span>
            用于连接AI服务，请确保 API Key 有效。获取 API Key 请访问{" "}
            <Link
              className="text-blue-500 hover:underline"
              href="https://openrouter.ai/"
              rel="noopener noreferrer"
              target="_blank"
            >
              OpenRouter
            </Link>
          </span>
        }
        isDisabled={isSubmitting || isLoading}
        label="API Key（可选）"
        name="apiKey"
        placeholder="请输入你的密钥"
      />
    </Card>
  );
});

export default APISettingsCard;
