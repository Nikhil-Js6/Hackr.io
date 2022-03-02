// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json(
      { 
         name: 'Nikhil',
         post: 'Senior developer and creater of this website',
         admin: 'true',
      }
  )
}
