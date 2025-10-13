import { LoadingProps } from "./types";
import Loading from "./Loading";
import { useLoadingValue } from "@gaddario98/react-state";

const LoadingContainer: React.FC<Omit<LoadingProps, "visible">> = (props) => {
  const visible = useLoadingValue();
  return <Loading {...props} visible={visible} />;
};

export default LoadingContainer;
