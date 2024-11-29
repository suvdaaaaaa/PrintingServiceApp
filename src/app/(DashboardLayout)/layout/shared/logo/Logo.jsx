import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "100",
  width: "300",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/logo.png" alt="logo" height={50} width={250} priority />
    </LinkStyled>
  );
};

export default Logo;
  