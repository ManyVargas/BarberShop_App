import {generateClasses} from '@formkit/themes'

const config = {
  config: {
    classes: generateClasses({
      global: {
        wrapper: "space-y-2 mb-3",
        message: "text-red-500 text-center text-sm font-bold uppercase p-2 my-5",
        label: "block mb-1 font-bold text-lg text-white",
        input: "w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-4"
      },
      submit: {
        input: "$reset bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold w-full p-3"
      }
    })
  }
}

export default config