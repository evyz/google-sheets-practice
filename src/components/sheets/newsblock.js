import React, { useState } from "react";
import SystemRow from "../../system-components/markup/row";
import SystemCell from "../../system-components/markup/cell";
import SystemWrapper from "../../system-components/markup/wrapper";
import SystemInput from "../../system-components/search/input";

const NewsBlock = () => {
  const [name, setName] = useState("");

  return (
    <SystemWrapper>
      <SystemRow>
        <SystemCell>
          <h1>Название новости</h1>
          <desc>Описание новости</desc>
        </SystemCell>
        <SystemCell>
          <h1>Название новости</h1>
          <desc>Описание новости</desc>
        </SystemCell>
        <SystemCell>
          <h1>Название новости</h1>
          <desc>Описание новости</desc>
        </SystemCell>
        <SystemCell>
          <h1>Название новости</h1>
          <desc>Описание новости</desc>
        </SystemCell>
        <SystemCell>
          <h1>Название новости</h1>
          <desc>Описание новости</desc>
        </SystemCell>
        <SystemCell>
          <h1>Название новости</h1>
          <desc>Описание новости</desc>
          <SystemInput
            value={name}
            setValue={setName}
            label={"Введите своё имя"}
            rules={{ notNull: true }}
          />
          <desc>Описание новости</desc>
          <desc>Описание новости</desc>
        </SystemCell>
      </SystemRow>
    </SystemWrapper>
  );
};

export default NewsBlock;
