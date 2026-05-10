export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-[420px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500">
            Signup for CargoIntelX
          </p>

          <button className="btn btn-primary mt-4">
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}