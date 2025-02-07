import { memo } from "react";
import { Card } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { DatePicker } from "@heroui/date-picker";
import { I18nProvider } from "@react-aria/i18n";

// 算命类型选项
const FORTUNE_TYPES = [
  { value: "love", label: "爱情运势" },
  { value: "career", label: "事业运势" },
  { value: "wealth", label: "财富运势" },
  { value: "health", label: "健康运势" },
  { value: "general", label: "综合运势" },
];

interface FortuneFormProps {
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

const FortuneForm = memo(function FortuneForm({
  isSubmitting,
  isLoading,
  onSubmit,
  onReset,
}: FortuneFormProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">赛博算命</h2>
      <p className="text-sm text-gray-400 mb-6">
        请输入你的个人信息和问题，我们的AI算命师将为你提供详细的运势分析。
      </p>
      <I18nProvider locale="zh-CN">
        <Form
          className="space-y-4"
          validationBehavior="native"
          onReset={onReset}
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
            hourCycle={24}
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
            description="请尽量详细描述你的问题（5-200字）"
            isDisabled={isSubmitting || isLoading}
            label="你的问题（可选）"
            maxLength={200}
            minLength={5}
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
      </I18nProvider>
    </Card>
  );
});

export default FortuneForm;
