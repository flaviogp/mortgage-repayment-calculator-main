const Container = ({ children }: React.PropsWithChildren) => {
  return <div className="flex flex-col">{children}</div>;
};

export default Container;
