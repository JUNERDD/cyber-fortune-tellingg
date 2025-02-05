"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useChat } from "ai/react";
import * as z from "zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";

// 表单验证schema
const formSchema = z.object({
  apiKey: z.string().min(1, "API Key不能为空"),
  name: z.string().min(1, "姓名不能为空"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "请输入正确的日期格式"),
  question: z.string().min(10, "问题至少需要10个字符"),
});

export default function CyberFortune() {
  const methods = useForm({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = methods;
  const { messages, setInput, handleSubmit: handleAISubmit } = useChat();

  const onSubmit = (data: any) => {
    const prompt = `根据以下信息进行占卜：
    姓名：${data.name}
    出生日期：${data.birthDate}
    问题：${data.question}
    请给出详细的占卜结果和建议。`;

    setInput(prompt);
    handleAISubmit();
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto p-6 mt-10">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">赛博算命</h2>
          <FormProvider {...methods}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="API Key"
                name="apiKey"
                placeholder="请输入你的API Key"
              />
              <Input label="姓名" name="name" placeholder="请输入你的姓名" />
              <Input
                label="出生日期"
                name="birthDate"
                placeholder="YYYY-MM-DD"
              />
              <Input
                label="你的问题"
                name="question"
                placeholder="请输入你想问的问题"
              />
              <Button className="w-full" type="submit">
                开始算命
              </Button>
            </form>
          </FormProvider>
        </Card>
      </div>

      {messages.length > 0 && (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="max-w-2xl mx-auto p-6 mt-10 bg-white/10 backdrop-blur rounded-lg"
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4 text-white">算命结果</h3>
          <div className="text-white space-y-2">
            {messages.map((m: any) => (
              <div key={m.id} className="p-4 bg-white/5 rounded">
                {m.content}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
