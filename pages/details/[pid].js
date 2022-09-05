import { useRouter } from 'next/router'

export default function Details(){
  const router = useRouter()
  const { pid } = router.query
  return(
    <>
      Project {pid}
    </>
  )
}