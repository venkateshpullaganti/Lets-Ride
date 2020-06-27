const envVariable = process.env

const Config: any = {}

Object.keys(envVariable).forEach(variable => {
   if (variable.includes('REACT_APP')) {
      const envKey = variable.replace('REACT_APP_', '')
      Config[envKey] = envVariable[variable]
   }
})

export { Config }
