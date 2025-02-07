"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useCompletion } from "ai/react";

import APISettingsCard from "@/components/api-settings-card";
import FortuneForm from "@/components/fortune-form";
import FortuneResult from "@/components/fortune-result";

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

  // 生成提示词的函数
  const generatePrompt = useMemo(() => {
    return (data: any) => {
      const fortuneType = FORTUNE_TYPES.find(
        (t) => t.value === data.fortuneType,
      )?.label;

      return `根据用户提供的个人信息和具体问题，进行${fortuneType}分析：

      【用户信息】
      姓名：${data.name}
      出生日期：${data.birthDate}
      当前提问时间：${new Date().toLocaleString()}
      
      【咨询问题】
      ${data.question}
      
      请严格按照以下结构撰写算命报告：
      1. 问题解读：首先解析用户提出的问题背景和核心关切
      2. 当前运势：结合命理要素分析当前状况
      3. 未来预测：预测未来三个月的发展趋势
      4. 专业建议：提供3-5条具体可行的建议
      5. 特别提醒：指出需要特别注意的事项
      
      要求：
      - 保持专业但亲切的语气
      - 适当使用命理学专业术语但需解释其含义
      - 针对「${data.question}」进行重点分析
      - 结论需包含可操作的解决方案`;
    };
  }, []);

  // 处理函数
  const handleStop = useCallback(() => {
    stop();
    setIsSubmitting(false);
    setPrompt("");
  }, [stop]);

  // 表单提交
  const completePrompt = useCallback(
    (prompt: string) => {
      complete(prompt);
      setShowResult(true);
    },
    [complete],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setIsSubmitting(true);

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      if (typeof data.apiKey === "string") {
        setApiKey(data.apiKey);
      }

      const prompt = generatePrompt(data);

      setPrompt(prompt);

      requestAnimationFrame(() => {
        completePrompt(prompt);
      });
    },
    [generatePrompt, completePrompt],
  );

  // 重置函数
  const handleReset = useCallback(() => {
    setError(null);
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto p-6 pt-0 flex flex-col gap-6">
        <div className={showResult ? "hidden" : "block"}>
          <APISettingsCard isLoading={isLoading} isSubmitting={isSubmitting} />
          <div className="mt-6">
            <FortuneForm
              isLoading={isLoading}
              isSubmitting={isSubmitting}
              onReset={handleReset}
              onSubmit={onSubmit}
            />
          </div>
        </div>

        <div className={showResult ? "block" : "hidden"}>
          <FortuneResult
            completion={completion}
            error={error}
            isLoading={isLoading}
            onBack={() => setShowResult(false)}
            onStop={handleStop}
          />
        </div>
      </div>
    </motion.div>
  );
}
