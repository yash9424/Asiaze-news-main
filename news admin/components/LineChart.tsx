export default function LineChart() {
  return (
    <svg width="100%" height="220" viewBox="0 0 400 220" style={{ display: 'block' }}>
      <polyline
        points="20,80 50,60 80,90 110,50 140,70 170,100 200,80 230,120 260,140 290,110 320,130 350,150"
        fill="none"
        stroke="#b0b0b0"
        strokeWidth="2"
      />
      <polyline
        points="20,100 50,80 80,70 110,60 140,90 170,70 200,100 230,120 260,180 290,160 320,170 350,190"
        fill="none"
        stroke="#e31e3a"
        strokeWidth="3"
      />
      <line x1="20" y1="200" x2="20" y2="20" stroke="#333" strokeWidth="2" />
      <line x1="20" y1="200" x2="380" y2="200" stroke="#333" strokeWidth="2" />
    </svg>
  )
}
