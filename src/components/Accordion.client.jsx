import { Disclosure, Transition } from "@headlessui/react";

export default function Accordion({ title, content }) {
  return (
    <Disclosure>
      <Disclosure.Button className="py-2">
        <h2 className="m-0">{title}</h2>
      </Disclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform height-95 width-100 opacity-0"
        enterTo="transform height-100 width-100  opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform height-100 width-100 opacity-100"
        leaveTo="transform height-95 width-100 opacity-0"
      >
        <Disclosure.Panel className="text-gray-500">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
}
