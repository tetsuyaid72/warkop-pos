"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PeriodFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList className="w-full">
        <TabsTrigger value="today" className="flex-1">Hari Ini</TabsTrigger>
        <TabsTrigger value="week" className="flex-1">7 Hari</TabsTrigger>
        <TabsTrigger value="month" className="flex-1">Bulan Ini</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}