import { TiTick } from "react-icons/ti";

const User = ({ type, image, name, position }) => {
  return type === "list" ? (
    <div className="px-3 py-5 cursor-pointer transition-all hover:bg-gray-200 flex items-start justify-between gap-3">
      <div className="flex gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={`/images/users/${image}.jpg`}
          alt="user"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-dark font-bold leading-[14px]">
              {name}
            </span>
            <div className="w-[14px] h-[14px] rounded-full bg-primary flex items-center justify-center">
              <TiTick className="text-white text-xs" />
            </div>
          </div>
          <span className="text-xs">@{name?.toLowerCase()}</span>
          <p className="text-[12px]">{position}</p>
        </div>
      </div>
      <button className="py-[6px] px-[14px] rounded-full border border-primary text-primary inline-block h-auto text-sm transition-all hover:bg-primary hover:text-white">
        + Follow
      </button>
    </div>
  ) : (
    <div className="px-5 py-3 bg-white cursor-pointer transition-all hover:bg-gray-200 flex items-center text-center rounded-2xl justify-center flex-col gap-3 shadow-md shadow-dark/10">
      <img
        className="w-[55px] h-[55px] rounded-full"
        src={`/images/users/${image}.jpg`}
        alt="user"
      />
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-dark font-bold leading-[14px]">
            {name}
          </span>
          <div className="w-[14px] h-[14px] rounded-full bg-primary flex items-center justify-center">
            <TiTick className="text-white text-xs" />
          </div>
        </div>
        <p className="text-[12px]">{position}</p>
      </div>
      <button className="py-[6px] px-[14px] rounded-full border border-primary text-primary inline-block h-auto text-sm transition-all hover:bg-primary hover:text-white">
        + Follow
      </button>
    </div>
  );
};

export default User;
