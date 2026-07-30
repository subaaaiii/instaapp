import { Navigate } from "react-router-dom";
import { useMe } from "../hooks/Auth/useMe";
import FullPageLoader from "../components/Loader";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { data: me, isPending } = useMe();

  if (isPending) {
    return <FullPageLoader/>;
  }

  if (!me) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}