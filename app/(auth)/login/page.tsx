export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-[420px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">
            CargoIntelX
          </h1>

          <p className="text-gray-500">
            Login to your account
          </p>

          <button className="btn btn-primary mt-4">
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}