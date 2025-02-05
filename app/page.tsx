"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCompletion } from "ai/react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Spinner } from "@heroui/spinner";
import { Form } from "@heroui/form";
import { DatePicker } from "@heroui/date-picker";
import Link from "next/link";

// 算命类型选项
const FORTUNE_TYPES = [
  { value: "love", label: "爱情运势" },
  { value: "career", label: "事业运势" },
  { value: "wealth", label: "财富运势" },
  { value: "health", label: "健康运势" },
  { value: "general", label: "综合运势" },
];

export default function CyberFortune() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { completion, complete, isLoading, stop } = useCompletion({
    api: "/api/completion",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: {
      prompt,
    },
    onError: (e) => {
      setError(e.message);
      setIsSubmitting(false);
    },
    onFinish: () => {
      setIsSubmitting(false);
      setError(null);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    setApiKey(data.apiKey as string);

    const prompt = `根据以下信息进行${FORTUNE_TYPES.find((t) => t.value === data.fortuneType)?.label}算命：
    姓名：${data.name}
    出生日期：${data.birthDate}
    问题：${data.question}
    请给出详细的算命结果和建议，包括：
    1. 当前运势分析
    2. 未来趋势预测
    3. 具体建议
    4. 注意事项`;

    setPrompt(prompt);

    requestAnimationFrame(() => {
      complete(prompt);
      setShowResult(true);
    });
  };

  const handleStop = () => {
    stop();
    setIsSubmitting(false);
    setPrompt("");
  };

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <div className="max-w-2xl mx-auto p-6 pt-0 flex flex-col gap-6">
        <div
          className={`form-section transition-all duration-300 ${showResult ? "hidden" : "block"}`}
        >
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

          <Card className="p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">赛博算命</h2>
            <p className="text-sm text-gray-400 mb-6">
              请输入你的个人信息和问题，我们的AI算命师将为你提供详细的运势分析。
            </p>
            <Form
              className="space-y-4"
              validationBehavior="native"
              onReset={() => {
                setError(null);
              }}
              onSubmit={onSubmit}
            >
              <Input
                isRequired
                description="请输入真实姓名以获得更准确的算命结果"
                isDisabled={isSubmitting || isLoading}
                label="姓名"
                maxLength={20}
                name="name"
                placeholder="请输入你的姓名"
              />
              <DatePicker
                isRequired
                description="请选择你的农历出生日期"
                granularity="second"
                isDisabled={isSubmitting || isLoading}
                label="出生日期"
                name="birthDate"
              />
              <Select
                isRequired
                isDisabled={isSubmitting || isLoading}
                label="算命类型"
                name="fortuneType"
                placeholder="请选择算命类型"
              >
                {FORTUNE_TYPES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <Textarea
                description="请尽量详细描述你的问题（10-200字）"
                isDisabled={isSubmitting || isLoading}
                label="你的问题"
                maxLength={200}
                minLength={10}
                name="question"
                placeholder="请输入你想问的问题"
                rows={3}
              />
              <div className="w-full flex gap-2 justify-center">
                <Button
                  isDisabled={isSubmitting || isLoading}
                  type="reset"
                  variant="flat"
                >
                  重置
                </Button>
                <Button
                  className="flex-1"
                  color="primary"
                  isDisabled={isSubmitting || isLoading}
                  type="submit"
                >
                  开始算命
                </Button>
              </div>
            </Form>
          </Card>
        </div>

        <div
          className={`result-section transition-all duration-300 ${showResult ? "block" : "hidden"}`}
        >
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">算命结果</h2>
              <div className="flex items-center gap-2">
                {completion.length > 0 && isLoading && (
                  <Button variant="flat" onPress={handleStop}>
                    停止
                  </Button>
                )}
                <Button
                  isDisabled={isLoading}
                  variant="flat"
                  onPress={() => setShowResult(false)}
                >
                  返回表单
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="whitespace-pre-wrap">
                {error ? (
                  <p className="mt-2 text-sm text-red-500">
                    发生了错误：{error}
                  </p>
                ) : completion.length > 0 ? (
                  completion.split("\n").map((line: string, i: number) => (
                    <p key={i} className="mb-2">
                      {line}
                    </p>
                  ))
                ) : (
                  <div className="flex items-center gap-2">
                    <Spinner color="white" size="sm" />
                    正在算命中...
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
