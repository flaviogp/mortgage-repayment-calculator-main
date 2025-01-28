const Container = ({ children }: React.PropsWithChildren) => {
  return <div className="flex flex-col w-screen h-screen">{children}</div>;
};

export default Container;
