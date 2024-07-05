const icons ={
number1: <><path d="M145 324H83.2V136.514C83.2 131.343 83.2667 124.99 83.4 117.456C83.5333 109.773 83.7333 101.943 84 93.9644C84.2667 85.8386 84.5333 78.5253 84.8 72.0246C83.3333 73.9453 80.3333 77.2695 75.8 81.9973C71.4 86.5773 67.2667 90.7141 63.4 94.4077L29.8 124.326L0 83.1053L94.2 0H145V324Z" fill="url(#paint0_linear_3458_26955)" fillOpacity="0.2" />      <defs>
<linearGradient id="paint0_linear_3458_26955" x1="-3.01729e-08" y1="37.9687" x2="125.039" y2="35.0375" gradientUnits="userSpaceOnUse">
  <stop stopColor="#6C2276" />
  <stop offset="0.25" stopColor="#682D78" />
  <stop offset="0.5" stopColor="#643579" />
  <stop offset="0.75" stopColor="#613B7A" />
  <stop offset="1" stopColor="#5D447C" />
</linearGradient>
</defs></>,

number2: <><path d="M8.27096 324V276.219L78.0571 160.18C83.571 151.382 87.6204 143.494 90.205 136.517C92.7897 129.539 94.5128 123.169 95.3744 117.404C96.4082 111.64 96.9252 106.331 96.9252 101.478C96.9252 88.736 94.4266 79.0281 89.4296 72.3539C84.6049 65.3764 77.454 61.8876 67.9768 61.8876C60.3951 61.8876 53.3304 64.4663 46.7825 69.6236C40.407 74.7809 34.9792 82.8202 30.4991 93.7416L0 59.1573C6.89245 40.955 16.5419 26.5449 28.9483 15.9269C41.3548 5.30898 55.6566 0 71.8538 0C85.2941 0 97.0113 3.94382 107.005 11.8315C117.172 19.4157 125.012 30.1854 130.526 44.1404C136.212 58.0955 139.055 74.7809 139.055 94.1966C139.055 104.511 138.28 114.826 136.729 125.14C135.351 135.152 132.421 145.77 127.941 156.994C123.633 168.219 117.258 180.809 108.815 194.764L50.918 290.781L42.9055 263.933H145V324H8.27096Z" fill="url(#paint0_linear_3371_20617)" fillOpacity="0.2" />
  <defs>
    <linearGradient id="paint0_linear_3371_20617" x1="-3.01729e-08" y1="37.9687" x2="125.039" y2="35.0375" gradientUnits="userSpaceOnUse">
      <stop stopColor="#6C2276" />
      <stop offset="0.25" stopColor="#682D78" />
      <stop offset="0.5" stopColor="#643579" />
      <stop offset="0.75" stopColor="#613B7A" />
      <stop offset="1" stopColor="#5D447C" />
    </linearGradient>
  </defs>
</>,

number3: <><path d="M69.5062 324C56.8372 324 44.2549 321.118 31.7594 315.354C19.2639 309.287 8.67744 300.792 0 289.871L16.4003 233.444C23.3423 242.242 31.4123 249.219 40.6104 254.376C49.8085 259.534 59.0934 262.112 68.465 262.112C79.0515 262.112 87.3818 258.472 93.456 251.191C99.5302 243.91 102.567 233.899 102.567 221.157C102.567 209.022 99.8773 199.466 94.4973 192.489C89.1173 185.511 80.4399 182.022 68.465 182.022H49.2011V133.331L99.9641 32.7641L104.65 59.1573H9.11131V0H136.67V47.7809L86.167 148.348L64.8204 126.961H77.0557C99.4434 126.961 116.364 135.758 127.819 153.354C139.273 170.949 145 193.551 145 221.157C145 239.056 142.31 255.893 136.93 271.669C131.55 287.14 123.306 299.73 112.199 309.438C101.092 319.146 86.8611 324 69.5062 324Z" fill="url(#paint0_linear_3371_20619)" fillOpacity="0.2" />  <defs>
<linearGradient id="paint0_linear_3371_20619" x1="-3.01729e-08" y1="37.9687" x2="125.039" y2="35.0375" gradientUnits="userSpaceOnUse">
  <stop stopColor="#6C2276" />
  <stop offset="0.25" stopColor="#682D78" />
  <stop offset="0.5" stopColor="#643579" />
  <stop offset="0.75" stopColor="#613B7A" />
  <stop offset="1" stopColor="#5D447C" />
</linearGradient>
</defs></>,

number4: <><path d="M0 255.96V205.509L73.7288 0H111.71L39.5454 205.509L21.8952 194.863H145V255.96H0ZM84.2296 324V255.96L85.3467 194.863V134.229H119.53V324H84.2296Z" fill="url(#paint0_linear_3371_20621)" fillOpacity="0.2" />  <defs>
<linearGradient id="paint0_linear_3371_20621" x1="-3.01729e-08" y1="37.9687" x2="125.039" y2="35.0375" gradientUnits="userSpaceOnUse">
  <stop stopColor="#6C2276" />
  <stop offset="0.25" stopColor="#682D78" />
  <stop offset="0.5" stopColor="#643579" />
  <stop offset="0.75" stopColor="#613B7A" />
  <stop offset="1" stopColor="#5D447C" />
</linearGradient>
</defs></>
}

export default function JoinProjectIcons({name}){
  if(!name){return null}
  return(
    <svg width="145" height="324" viewBox="0 0 145 324" fill="none" xmlns="http://www.w3.org/2000/svg">
      { icons[name] }
    </svg>
  )
}