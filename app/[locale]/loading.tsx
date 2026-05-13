import { Container } from "@/components/ui/container";

export default function LocaleLoading() {
  return (
    <main className="bg-background text-foreground">
      <div className="animate-pulse">
        <div className="h-screen bg-[linear-gradient(135deg,#0F766E,#14B8A6)]">
          <Container className="grid h-full items-center gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="h-8 w-56 rounded-full bg-white/20" />
              <div className="h-16 w-full max-w-2xl rounded-3xl bg-white/20" />
              <div className="h-16 w-4/5 rounded-3xl bg-white/20" />
              <div className="h-6 w-full max-w-xl rounded-full bg-white/20" />
              <div className="h-6 w-3/4 rounded-full bg-white/20" />
            </div>
            <div className="h-[480px] rounded-[36px] bg-white/20" />
          </Container>
        </div>
      </div>
    </main>
  );
}
