"use client";
import Spinner from "@/components/custom/Common/Spinner";
import Home from "@/components/custom/Home/Home";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Home />
      </Suspense>
    </main>
  );
}
