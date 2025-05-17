import { useRef, useState, useEffect } from "react";

import Image from "next/image";

import { Container, Comments, Card, CardHeader, Message, CardFooter } from "./styles";
import Link from "next/link";

type FeedbackProps = {
  posts: {
    name: string;
    message: string;
    photo: string;
    created_at: string;
  }[];
};

export default function Feedback({ posts }: FeedbackProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const cardWidth = scrollRef.current.children[0].clientWidth + 16; // width + gap
      const nextIndex = (currentIndex + 1) % posts.length;
      scrollRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: "smooth",
      });

      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Container>
      <h2>O que nossos <span>clientes</span><br />falam <span>sobre nós</span></h2>

      <Comments ref={scrollRef}>
        {posts.map(post => (
          <Card key={post.name}>
            <CardHeader>
              <Image
                width={50}
                height={50}
                src={post.photo}
                alt="second"
                style={{ objectFit: 'cover', borderRadius: 50 }}
              />
              <h3>{post.name}</h3>
            </CardHeader>
            <Message>
              <p>{post.message}</p>
            </Message>
            <CardFooter>
              <Link href='/'>@instagram</Link>
              <p>{post.created_at}</p>
            </CardFooter>
          </Card>
        ))}
      </Comments>

    </Container>
  )
};