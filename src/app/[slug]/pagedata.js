// "use client";

// import { useEffect, useState } from "react";

// export default function PageData({ data, slug }) {
//   const [components, setComponents] = useState({});

//   const capitalize = (str) =>
//     str
//       .split(/[-_]/g)
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join("");

//   useEffect(() => {
//     const loadComponents = async () => {
//       const loaded = {};
//       await Promise.all(
//         data?.Blocks?.map(async (block) => {
//           try {
//             const name = capitalize(block.name.toLowerCase());
//             const mod = await import(`@/components/${name}`);
//             loaded[block.name] = mod.default;
//           } catch (err) {
//             console.warn(`Could not load component: ${block.name}`, err);
//           }
//         })
//       );
//       setComponents(loaded);
//     };

//     loadComponents();
//   }, [data]);

//   return (
//     <>
//       {data?.Blocks?.map((block, index) => {
//         const Component = components[block.name];
//         if (!Component) return null;
//         return <Component key={index} data={block} slug={slug} />;
//       })}
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function PageData({ data, slug }) {
  const [components, setComponents] = useState({});

  const capitalize = (str) =>
    str
      .split(/[-_]/g)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

  useEffect(() => {
    const loadComponents = async () => {
      if (!Array.isArray(data?.Blocks)) return;

      const loaded = {};

      await Promise.all(
        data.Blocks.map(async (block) => {
          try {
            const name = capitalize(block.name.toLowerCase());
            const mod = await import(`@/components/${name}`);
            loaded[block.name] = mod.default;
          } catch (err) {
            console.warn(`Could not load component: ${block.name}`, err);
          }
        })
      );

      setComponents(loaded);
    };

    loadComponents();
  }, [data]);

  return (
    <>
      {Array.isArray(data?.Blocks) &&
        data.Blocks.map((block, index) => {
          const Component = components[block.name];
          if (!Component) return null;
          return <Component key={index} data={block} slug={slug} />;
        })}
    </>
  );
}
