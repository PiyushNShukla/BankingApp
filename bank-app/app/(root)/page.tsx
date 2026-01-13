import NavbarWrapper from "@/components/wrapper/NavbarWrapper";
import FeatureGrid from "@/components/dashboard/FeatureGrid";
export default function HomePage() {
  return (
    <>
      <NavbarWrapper />
       <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Balance */}
        <div
          className="
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            p-8
            text-white
            shadow-lg
            mb-10
          "
        >
          <p className="text-sm opacity-90 mb-2">
            Total Available Balance
          </p>
          <h1 className="text-4xl font-bold mb-6">
            ₹42,450.00
          </h1>
          <div className="flex justify-between items-center text-sm opacity-90">
            <p>Account: Savings ** 264</p>
            <span className="bg-white/20 px-4 py-1 rounded-full text-xs">
              Active
            </span>
          </div>
        </div>

        {/* Features */}
        <FeatureGrid />
      </main>
    </>
  );
}
