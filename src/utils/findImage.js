const imageModules = import.meta.glob(
  "../assets/images/products/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" }
);

const normalize = (text) =>
  text.toLowerCase().replace(/\.[a-z]+$/, "").replace(/[^a-z0-9]/g, "");

export const findImage = (fileName) => {
  if (!fileName) return undefined;
  const key = Object.keys(imageModules).find(
    (path) => normalize(path.split("/").pop()) === normalize(fileName)
  );
  if (!key) console.warn("Image not found in products folder:", fileName);
  return key ? imageModules[key] : undefined;
};