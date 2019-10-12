const length = vector => Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);

const scaleBy = (vector, x, y = x, z = x) => (
  { x: vector.x * x, y: vector.y * y, z: vector.z * z });

const normalize = (vector, len = 1.0) => {
  const s = len / length(vector);
  return scaleBy(vector, s, s, s);
};


const spiralGenerator = (i) => {
  const angle = 0.5 * i;
  const x = (250) + (i + (50) * angle) * Math.cos(angle);
  const y = (250) + (i + (50) * angle) * Math.sin(angle);
  return ({ x, y });
};

const sortByFrequency = (keywords,largestAtCenter) =>{
if(largestAtCenter){
    return keywords.sort((a,b)=>a.frequency<b.frequency?1:-1)
}
return keywords.sort((a,b)=>a.frequency<b.frequency?-1:1)
}

export const generateCircles = (keywordData, center, scale, largestAtCenter) => {
  const sortedKeywords = sortByFrequency(keywordData,largestAtCenter);
  const sum = sortedKeywords.reduce((acc, current) => acc + current.frequency, 0);
  const circles = sortedKeywords.map((keyword, index, arr) => ({
    center,
    size: (keyword.frequency / (sum)) * scale,
    color: keyword.color,
    label: keyword.keyword,
    ...spiralGenerator(index),
  }));
  return circles;
};

const distanceToCenter = (circle) => {
  const dx = circle.x - circle.center.x;
  const dy = circle.y - circle.center.y;
  const distance = dx * dx + dy * dy;
  return distance;
};

const sortOnDistanceToCenter = (a, b) => {
  const valueA = distanceToCenter(a);
  const valueB = distanceToCenter(b);
  if (valueA > valueB) return 1;
  if (valueA < valueB) return -1;
  return 0;
};

export const calcPositions = (circles) => {
  const sortedCircles = circles.sort(sortOnDistanceToCenter);
  const damping = 0.005;
  for (let pr = 0; pr < 5000; pr += 1) {
    // Push them away from each other
    for (let i = sortedCircles.length - 1; i >= 0; i -= 1) {
      const ci = sortedCircles[i];

      for (let j = i + 1; j < sortedCircles.length; j += 1) {
        const cj = sortedCircles[j];
        if (i !== j) {
          const dx = cj.x - ci.x;
          const dy = cj.y - ci.y;
          const r = ci.size + cj.size;
          const d = (dx * dx) + (dy * dy);
          if (d < (r * r) - 0.01) {
            const v = { x: dx, y: dy, z: 0 };
            const vNorm = normalize(v);
            const vScaled = scaleBy(vNorm, (r - Math.sqrt(d)) * 0.5);
            cj.x += vScaled.x;
            cj.y += vScaled.y;
            ci.x -= vScaled.x;
            ci.y -= vScaled.y;
          }
        }
      }
    }

    // push toward center
    for (let i = 0; i < sortedCircles.length; i += 1) {
      const c = sortedCircles[i];
      const v = { x: c.x - c.center.x, y: c.y - c.center.y };
      const vScaled = scaleBy(v, damping);
      c.x -= vScaled.x;
      c.y -= vScaled.y;
    }
  }
};

export const drawCirclesOnCanvas = (circles, canvas, drawContainerCircle, containerCircleColor) => {
  const ctx = canvas.getContext('2d');
  if(drawContainerCircle){
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.width / 2) - 5, 0, Math.PI * 2, true);
  ctx.fillStyle = containerCircleColor;
  ctx.fill();
  }
  ctx.closePath();
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size , 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = circle.color;
    ctx.lineWidth = 0;
    ctx.fill();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `lighter ${Math.floor(circle.size / 4)}px sans-serif`;
    ctx.fillStyle = '#000000';
    ctx.fillText(circle.label, circle.x, circle.y);
  });
};
