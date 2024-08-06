import Image from "next/image";
import Cat404 from "@/public/404NotFound.jpg";

const NotFound = () => {
  return (
    <>
      <div className="flex min-h-[100vh] select-none flex-col-reverse items-center justify-around  py-10 lg:flex-row xl:py-0">
        <div className="relative flex w-full flex-col items-center justify-center lg:min-h-screen lg:w-1/2 lg:py-0">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-4xl font-semibold">Not Found</p>
          <p className="flex text-center text-lg items-center mx-12">The resource requested could not be found on the server.</p>
        </div>
        <div className="relative mx-auto ml-auto h-[300px] w-[300px] rounded-xl bg-cover lg:h-[500px] lg:w-[500px] xl:h-[500px] xl:w-[550px] bg-center">
          <Image src={Cat404} alt="404 Not Found" />
        </div>
      </div>
    </>
  );
};

export default NotFound;
