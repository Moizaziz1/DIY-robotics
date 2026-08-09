import gradio as gr
import spaces
import torch

@spaces.GPU
def greet(n):
    tensor = torch.Tensor([n]).cuda()
    return f"Hello {tensor} Tensor"

demo = gr.Interface(fn=greet, inputs=gr.Number(), outputs=gr.Text())
demo.launch()