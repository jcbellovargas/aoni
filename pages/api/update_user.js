// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../firebase"
import { doc, setDoc } from "firebase/firestore";


// export default async function handler(req, res) {
//   const user = req.body
//   console.log("REQUEST BODY: "+JSON.stringify(user))
//   // return;
//   await setDoc(doc(db, "users", user.id), {
//     name: user.name,
//     email: user.email,
//     image: user.image,
//     walletAddress: user.walletAddress,
//   });
//   res.status(200).json({ name: 'John Doe' })
// }

export default async function handler(req, res) {
  const user = req.body
  console.log("REQUEST BODY: "+JSON.stringify(user))
  // return;
  const userRef = doc(db, "users", user.id)
  await setDoc(userRef, { ...user }, { merge: true });
  res.status(200).json({ user })
}
