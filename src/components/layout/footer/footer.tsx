import { useEffect, useState } from "react";
import { getIpAddress } from "../../../services/ipservice";

const Footer: React.FC = () => {
  const [ip, setIp] = useState<string>("");

  useEffect(() => {
    const fetchIp = async () => {
      setIp(await getIpAddress());
    };

    fetchIp();
  }, []);
  return (
    <footer className="p-1">
      <p className="text-sm font-light">
        IP Connected:<b> {ip || "loading..."}</b>
      </p>
    </footer>
  );
};

export default Footer;
