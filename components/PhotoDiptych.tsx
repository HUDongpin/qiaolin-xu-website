import Image from "next/image";

export function PhotoDiptych() {
  return (
    <div className="photo-diptych">
      <div className="portrait-panel">
        <Image
          src="/images/qiaolin-portrait.webp"
          alt="Portrait of Qiaolin XU (Shirleen)"
          fill
          priority
          sizes="(max-width: 767px) 42vw, (max-width: 1180px) 39vw, 255px"
        />
      </div>
      <div className="classroom-panel" aria-hidden="true">
        <Image
          src="/images/reflective-classroom.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 50vw, (max-width: 1180px) 46vw, 305px"
        />
      </div>
    </div>
  );
}
