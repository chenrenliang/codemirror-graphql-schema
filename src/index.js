import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import CodeMirror from "@uiw/react-codemirror";
// 放到codesandbox,css不生效，手动引入
import "codemirror/lib/codemirror.css";

//引入monoki主题
import "codemirror/theme/monokai.css";

import "codemirror/addon/selection/active-line";
// 自动补全
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";

// 代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";

import * as prettier from "prettier/standalone";
import * as graphql from "prettier/parser-graphql";

import "codemirror/addon/hint/show-hint";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/jump-to-line";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/lint/lint";
import "codemirror/keymap/sublime";
import "codemirror/keymap/vim";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/info";
import "codemirror-graphql/jump";
import "codemirror-graphql/mode";

const gutters = [];
gutters.push("CodeMirror-linenumbers");
gutters.push("CodeMirror-foldgutter");

const gqlQuery = `
### whitelist-query-simpleMatchList
query simpleMatchList($fbOddsTypes: [FBOddsType]!, $inplayOnly: Boolean, $featuredMatchesOnly: Boolean) {
  matches(
    fbOddsTypes: $fbOddsTypes
    inplayOnly: $inplayOnly
    featuredMatchesOnly: $featuredMatchesOnly
  ) {
    id
    frontEndId
    matchDate
    kickOffTime
    homeTeam {
      name_en
      name_ch
    }
    awayTeam {
        name_en
                        name_ch
    }
    venue {
      code
      name_en
      name_ch
    }
                featureStartTime
    featureMatchSequence
         poolInfo {
      inplayPools
      sellingPools
    }
    tournament {
      id
             nameProfileId
      code
             sequence
             name_en
         name_ch
    }
  }
}`;

const gqlQuery2 = `query matchRemarks {
  matches(fbOddsTypes: [], remarksOnly: true) {
    id
    frontEndId
    kickOffTime
    updateAt
    adminOperation {
      remark {
        seq
        typ
        cont {
          lang
          content
        }
      }
    }
  }
}`;

export function prettify(query, options) {
  return prettier.format(query, {
    ...options,
    parser: "graphql",
    plugins: [graphql]
  });
}

// https://github.com/uiwjs/react-codemirror/issues/20
const code = prettify([gqlQuery, gqlQuery2].join("\r\n\n\n"));
const App = () => {
  const [visible, setVisible] = React.useState();

  const codeOptions = {
    theme: "graphiql",
    mode: "graphql",
    line: true,
    lineNumbers: true,
    autoCloseBrackets: true,
    showCursorWhenSelecting: true,
    tabSize: 2,
    // 当前行背景高亮
    styleActiveLine: true,
    // 代码折叠
    lineWrapping: true,
    readOnly: true,
    gutters,
    foldGutter: {
      minFoldSize: 4
    }
  };

  return (
    <div style={{ width: "100%", height: "100$%" }}>
      <CodeMirror value={code} options={codeOptions} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
