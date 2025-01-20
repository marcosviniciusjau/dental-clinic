import { Text } from "@marcos-vinicius-design-system/react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { HeaderContainer, HeaderText } from "./styles";
export function Header() {
  return (
    <HeaderContainer>
      <Image src={Logo} alt="Logo" width={100} height={100} />
      <HeaderText>
        <Text size="md">Home </Text>
        <a href="/contact" style={{ textDecoration: "none" }}>
          <Text>Contato </Text>
        </a>
        <Text>Sobre </Text>
      </HeaderText>
    </HeaderContainer>
  );
}
