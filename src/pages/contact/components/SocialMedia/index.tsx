import aparelho from "@/assets/aparelho.jpg";
import implante from "@/assets/implante.jpg";
import consulta from "@/assets/consulta.jpg";
import limpeza from "@/assets/limpeza.jpg";
import LogoWhatsapp from "@/assets/logo_whatsapp.svg";

import LogoFacebook from "@/assets/logo_facebook.svg";
import LogoGmail from "@/assets/logo_gmail.svg";

import LogoInstagram from "@/assets/logo_instagram.svg";

import { Heading, Text } from "@marcos-vinicius-design-system/react";

import { Container, SocialMediaDiv, Imagem, Texto } from "./styles";
import Image from "next/image";
export function SocialMedia() {
  return (
    <Container>
      <SocialMediaDiv>
        <Imagem>
          <Image
            src={LogoGmail}
            width={100}
            quality={100}
            priority
            style={{ borderRadius: "4px" }}
            alt="logo Gmail"
          />
        </Imagem>

        <Texto>
          <a
            href="mailto:mvaraujowebsites@gmail.com"
            style={{ textDecoration: "none" }}
            target="_parent"
          >
            <Text size="2xl">Dental Clinic</Text>
          </a>
        </Texto>
      </SocialMediaDiv>
      <SocialMediaDiv>
        <Imagem>
          <Image
            src={LogoWhatsapp}
            width={100}
            quality={100}
            priority
            style={{ borderRadius: "4px" }}
            alt="logo whatsapp"
          />
        </Imagem>
        <Texto>
          <a
            href="https://api.whatsapp.com/send?phone=5514982078002&text=Como+posso+te+ajudar%3F"
            style={{ textDecoration: "none" }}
            target="_parent"
          >
            <Text size="2xl">14 98207-8002</Text>
          </a>
        </Texto>
      </SocialMediaDiv>
      <SocialMediaDiv>
        <Imagem>
          <Image
            src={LogoInstagram}
            width={100}
            quality={100}
            priority
            style={{ borderRadius: "4px" }}
            alt="logo instagram"
          />
        </Imagem>

        <Texto>
          <a
            href="https://instagram.com"
            style={{ textDecoration: "none" }}
            target="_parent"
          >
            <Text size="2xl">@dental-clinic</Text>
          </a>
        </Texto>
      </SocialMediaDiv>
      <SocialMediaDiv>
        <Imagem>
          <Image
            src={LogoFacebook}
            width={100}
            quality={100}
            priority
            style={{ borderRadius: "4px" }}
            alt="logo facebook"
          />
        </Imagem>

        <Texto>
          <a
            href="https://facebook.com"
            style={{ textDecoration: "none" }}
            target="_parent"
          >
            <Text size="2xl">Dental Clinic</Text>
          </a>
        </Texto>
      </SocialMediaDiv>
    </Container>
  );
}
