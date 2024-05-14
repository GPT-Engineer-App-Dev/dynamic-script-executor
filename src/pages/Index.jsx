import { useState, useEffect } from "react";
import { Box, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { FaPlay, FaArrowRight } from "react-icons/fa";
import { create } from "../../lib/openai";

const Index = () => {
  const [code, setCode] = useState("");
  const toast = useToast();

  const [prompt, setPrompt] = useState("");

  const handleSendToAI = async () => {
    const response = await create({ messages: [{ role: "user", content: prompt }], model: "gpt-4" });
    setCode(response.choices[0].message.content);
  };

  const handleExecuteCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const func = new Function(code);
      func();
      toast({
        title: "Execution Successful",
        description: "Your JavaScript code has been executed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Execution Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Input placeholder="Enter your prompt for GPT-4..." value={prompt} onChange={(e) => setPrompt(e.target.value)} size="lg" mb={4} />
      <Button leftIcon={<FaArrowRight />} colorScheme="blue" onClick={handleSendToAI}>
        Send to AI
      </Button>
      <Textarea placeholder="Write your JavaScript code here..." value={code} onChange={(e) => setCode(e.target.value)} size="lg" height="200px" mb={4} mt={4} />
      <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={handleExecuteCode} mt={2}>
        Execute Code
      </Button>
    </Box>
  );
};

export default Index;
