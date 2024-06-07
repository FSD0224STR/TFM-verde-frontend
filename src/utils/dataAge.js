
export default function dataAge() {
   const Age = Array.from({ length: 75 - 18 + 1 }, (_, index) => ({ number: index + 18 }))
   return Age
}
