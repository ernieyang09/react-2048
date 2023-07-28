import dayjs from "dayjs";
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { GameStatus } from "@/constants";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Grid from "@/components/Grid";
import Tile from "@/components/Tile";
import { MediaMobile } from "@/style";

const Board = styled.div`
  position: relative;
  width: 497px;
  height: 497px;
  background: #9a9a95;
  padding: var(--grid-gap);
  margin: 0 auto;

  ${MediaMobile} {
    width: 260px;
    height: 260px;
  }
`;

const SModal = css`
  top: 15%;
  max-width: 580px;
`;

const statusDisplay = {
  [GameStatus.SUCCESS]: "Success",
  [GameStatus.FAIL]: "Fail",
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Record = styled.div`
  border: 1px solid #555;
  color: #555;
  padding: 0.5rem;
  cursor: pointer;
  .time {
    margin-bottom: 0.25rem;
  }
  .record {
    display: flex;
    justify-content: space-between;
  }

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const RecordBlock = ({ rootRef, stop, resume }) => {
  const [histories, setHistories] = useState([]);
  const [select, setSelect] = useState(undefined);

  const getLocalHistories = () => {
    const his = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    setHistories(his);
  };

  const clearLocalHistories = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "[]");
    setHistories([]);
  };

  useEffect(() => {
    getLocalHistories();
    window.addEventListener("new record", getLocalHistories);
    return () => {
      window.removeEventListener("new record", getLocalHistories);
    };
  }, []);

  useEffect(()=> {
    if (select === undefined) {
      resume()
    } else {
      stop()
    }
  }, [select, resume, stop])

  return (
    <div>
      <div style={{ marginBottom: "0.5rem" }}>
        <HeaderWrap>
          <div style={{ fontSize: "1.5em", fontWeight: 500 }}>Record</div>
          <div
            style={{ color: "#1b9aaa", cursor: "pointer" }}
            onClick={clearLocalHistories}
          >
            clear
          </div>
        </HeaderWrap>
      </div>
      <div>
        {histories.map(({ date, score, data, gameStatus }) => (
          <Record
            key={date}
            onClick={() => {
              setSelect(data);
            }}
          >
            <div className="time">
              {dayjs(date).format("YYYY/MM/DD hh:mm A")}
            </div>
            <div className="record">
              <div>{`Score: ${score}`}</div>
              <div>{`Status: ${statusDisplay[gameStatus]}`}</div>
            </div>
          </Record>
        ))}
      </div>
      <Modal
        open={select !== undefined}
        onClose={() => setSelect(undefined)}
        classNames={{
          modal: SModal,
        }}
        container={rootRef.current}
      >
        <h2>Last Screenshot</h2>

        <Board>
          <div style={{ position: "relative" }}>
            <Grid />
            {select &&
              Object.entries(select).map(([key, tile]) => (
                <Tile
                  key={key}
                  number={tile.value}
                  X={tile.x}
                  Y={tile.y}
                  update={tile.update}
                />
              ))}
          </div>
        </Board>
      </Modal>
    </div>
  );
};

export default RecordBlock;
