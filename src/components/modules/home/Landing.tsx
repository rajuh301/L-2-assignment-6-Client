import { Input } from "@nextui-org/input";

import { SearchIcon } from "../../../assets/icons";
import { useSearchItems } from "@/src/hooks/search.hook";
import { watch } from "fs";



const Landing = () => {


 





  return (
    <div className="h-screen bg-[url('/glass.jpg')] bg-cover bg-center">
      <div className="pt-32 max-w-xl flex-1 mx-auto">
        <form className="flex-1">
          <Input
            aria-label="Search"
            classNames={{
              innerWrapper: "bg-defult-100",
              input: "input-sm",
            }}
            placeholder="Search..."
            size="lg"
            startContent={
              <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-100" />
            }
            type="text"
          />
        </form>
      </div>
    </div>
  );
};

export default Landing;
