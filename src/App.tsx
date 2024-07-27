
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [messages, setMessages] = useState<string[] | []>([])
  const [sendMessage, setSendMessage] = useState("")


  useEffect(() => {
    const socket = new WebSocket('wss://websocket-api-lodd.onrender.com/')
    socket.onopen = () => {
      console.log('connected')
      setSocket(socket)
    }

    socket.onmessage = (message) => {
      console.log('Received message:', message.data)
      setMessages((prev) => {
        return [...prev, message.data]
      })


    }

    return () => {
      socket.close()
    }
  }, [])
  if (!socket) {
    return <div>
      Loading ...
    </div>
  }
  return (
    <div>
      <input type="text" onChange={(e) => setSendMessage(e.target.value)} />
      <button onClick={() => { socket.send(sendMessage) }}>send</button>
      {messages.map((msg) => {
        return <div>
          {msg}
        </div>
      })}

    </div>
  )

}

export default App
