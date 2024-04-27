const RoleCardTestSection = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        maxWidth: "1300px",
        gap: "24px",
        margin: "0 auto",
      }}
      className="container"
    >
      <RoleCard
        imgSrc={"images/logo_white_60_60.svg"}
        title="UI\UX designer"
        shortDesc="UI/UX-дизайнери створюють зручний і яскравий зовнішній вигляд програм і сайтів."
      >
        <p>
          Також дизайнер створює елементи фірмового стилю (зображення, персонажі, шрифти, кольори,
          слогани) та інші візуальні елементи, які бренд розміщує на товарах, рекламі, в соцмережах
          тощо.
        </p>
        <p>
          Дизайнер – одна з головних професій у IT-галузі. Все, що ти бачиш в інтернеті, хтось
          вигадав і намалював. Дизайнери потрібні кожному бренду, тож вакансій завжди багато. Це
          професія із величезними перспективами і необмеженим розвитком.
        </p>
      </RoleCard>
    </div>
  )
}

export default RoleCardTestSection
