import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const API_KEY = "SUA_API_GEMINI_AQUI"

app.post("/generate", async (req,res)=>{

try{

const prompt = `
Generate 3 viral video moments.

Return only:

so_10,eo_40
so_50,eo_80
so_90,eo_120
`

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{ text: prompt }
]
}
]
})
}
)

const data = await response.json()

if(!data.candidates){

console.log(data)

return res.json([
"so_10,eo_40",
"so_50,eo_80",
"so_90,eo_120"
])

}

const text = data.candidates[0].content.parts[0].text

const moments = text
.split("\n")
.map(l=>l.trim())
.filter(l=>l.startsWith("so_"))

res.json(moments)

}catch(e){

console.error(e)

res.json([
"so_10,eo_40",
"so_50,eo_80",
"so_90,eo_120"
])

}

})

app.listen(3000,()=>{
console.log("Servidor rodando em http://localhost:3000")
})