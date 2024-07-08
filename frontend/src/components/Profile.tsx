export default function Profile() {
  return (
    <div className="grid md:grid-cols-2 gap-24 justify-items-center my-12">
      <div className="content-center ">
        {/* Profile Image */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-80"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
      <div className="content-center text-center w-full">
        {/* Profile Data */}
        <p className="my-4 text-3xl">First name: John</p>
        <p className="my-4 text-3xl">Last name: Doe</p>
      </div>
    </div>
  );
}
