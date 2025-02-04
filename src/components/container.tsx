const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center max-w-[1000px] bg-white rounded-lg overflow-hidden md:flex-row  md:h-[640px] [&>*]:md:min-w-[50%] [&>*]:md:max-w-[50%]   ">
      {children}
    </div>
  );
};

export default Container;
