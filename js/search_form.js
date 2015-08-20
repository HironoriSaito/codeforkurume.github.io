/**
 * Created by minto on 15/08/19.
 */

var Search = new Object();

/**
 * text����AreaModel�������Ă���(name�Ƃ̊��S��v)
 * text�ƈ�v������̂��������null��Ԃ�
 */
Search.getMatchArea = function(text){
    var return_value = null;
    function searchMatchName(area){
        if(area.name==text){
            return_value = area;
        }
    }

    var data = AreaModel.data;
    data.forEach(searchMatchName);
    return return_value;
};

/**
 * text���猟���⊮�̌����擾����
 * return AreaModel
 */
Search.getCandidate = function(text){
    var return_area = [];
    function pushCandidate(area){
        if(area.name.indexOf(text)!=-1 || area.furigana.indexOf(text)!=-1){
            return_area.push(area);
        }
    }

    AreaModel.data.forEach(pushCandidate);
    return return_area;
};

/**
 * Select�̒���Candidate���X�V����
 */
Search.changeSelectCandidate = function(areas){
    var select = $("#select_candidate");
    select.empty();
    function addOption(area){
        var option = $(
            "<option></option>",
            {
                value: area.name,
                text: area.name
            }
        );
        console.log(option);
        select.append(option);
    }

    areas.forEach(addOption);
};

/**
 * �����p��input���ύX���ꂽ�Ƃ��̏����B
 */
Search.updateInput = function(){
    var input = $("#input_area").val();
    var area = Search.getMatchArea(input);

    if(area!=null){
        var area_master = AreaMasterModel.data[area.mastercode-1];
        console.log(area_master);
    }

    var area_candidate = Search.getCandidate(input);
    Search.changeSelectCandidate(area_candidate);
    console.log("candidate: "+area_candidate[0].name);
    console.log(input);
};

$("#input_area").keyup(Search.updateInput);