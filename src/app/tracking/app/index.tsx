"use client";

import { useState } from "react";

import { Box, CubeScan, Delivery, Verify } from "@assets";
import { api } from "@services/api";
import { orderStatusNumber } from "@helpers/index";

import { Container, Content, Input, Step, Progress, StepLabel, Steps, Pulse, Popup } from "./styles";

interface StepProps {
  pulse: "active" | "deactivate" | "completed";
  progress: "active" | "deactivate" | "completed";
  stroke: string;
}

const getStepState = (status: number, activeIndex: number, completedIndex: number): StepProps => ({
  pulse: status === activeIndex ? "active" : "deactivate",
  progress:
    status === 0 ? "deactivate" :
      status >= completedIndex ? "completed" :
        status >= activeIndex + 1 ? "active" : "deactivate",
  stroke:
    status === 0 ? "#AEAEAE" :
      status >= activeIndex + 1 ? "#41B06E" :
        status >= activeIndex ? "#F55D00" : "#AEAEAE",
});

export default function OrderSteps() {
  const [status, setStatus] = useState(0);

  const handleInput = async (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = evt.target as unknown as { value: string };

    if (evt.key === "Enter") {
      const data = await api.tracking.search(value);
      setStatus(orderStatusNumber(data.status));
    };
  };

  const steps = [
    {
      icon: <Box width={25} height={25} stroke={getStepState(status, 1, 3).stroke} strokeWidth={2} />,
      labels: {
        active: "pedido em andamento",
        completed: "pedido recebido",
      },
      state: getStepState(status, 1, 3),
    },
    {
      icon: <CubeScan width={25} height={25} stroke={getStepState(status, 3, 5).stroke} strokeWidth={2} />,
      labels: {
        active: "embalando pedido",
        completed: "pedido embalado",
      },
      state: getStepState(status, 3, 5),
    },
    {
      icon: <Delivery width={25} height={25} fill={getStepState(status, 5, 7).stroke} strokeWidth={2} />,
      labels: {
        active: "encaminhando para o correio",
        completed: "correio",
      },
      state: getStepState(status, 5, 7),
    },
    {
      icon: <Verify width={25} height={25} stroke={getStepState(status, 7, 8).stroke} strokeWidth={2} />,
      labels: {
        active: "aguardando a entrega",
        completed: "entregue ao destinatário",
      },
      state: getStepState(status, 7, 8),
    },
  ];

  return (
    <Container>
      <Input placeholder="Código do Pedido" onKeyDown={handleInput} />
      <Content>
        <Steps>
          {steps.map((step, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center" }}>
              <Step>
                {idx === 2 && idx <= status && (
                  <Popup>
                    assistir
                  </Popup>
                )}
                {idx === 3 && idx <= status && (
                  <Popup>
                    assistir
                  </Popup>
                )}
                <Pulse $background={step.state.pulse}>{step.icon}</Pulse>
                <StepLabel>
                  {status >= (idx + 1) * 2 && <p>{step.labels.completed}</p>}
                  {status === (idx * 2 + 1) && <p>{step.labels.active}</p>}
                </StepLabel>
              </Step>
              {idx < steps.length - 1 && (
                <Progress $background={step.state.progress}>
                  <span />
                </Progress>
              )}
            </div>
          ))}
        </Steps>
      </Content>
    </Container>
  );
}
