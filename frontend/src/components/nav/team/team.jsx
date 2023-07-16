import React from 'react'

import './team.scss'

import Avatar from '../../avatar/avatar'
import FriendsModal from '../../_modals/friends/friends'
import Modal from '../../_modals/index'

import { IoIosAdd } from 'react-icons/io'
import { MdDeleteOutline } from 'react-icons/md'

export default function Team(props) {
	const [ team, setTeam ] = React.useState({})
	const [ teamAddAccount, setTeamAddAccount ] = React.useState(-1)

	const onTeam = {
		create: () => {
			setTeam({
				name: props.account.username,
		
				id: 258173,
				host: props.account,
		
				accounts: [
					props.account
				]
			})
		},
		leave: () => {
			setTeam({})
		},
		add: friend => {
			if(friend.isInTeam
				|| (friend.status && friend.status.type === 'playmatch')
				|| team.accounts.findIndex(elem => elem.id === friend.id) !== -1)return setTeamAddAccount(true)

			const accounts = team.accounts
			accounts.push({
				...friend,
				status: 'wait'
			})

			setTeam({...team, accounts: accounts})
		},
		delete: slot => {
			if(team.accounts[slot].id === props.account.id) setTeam({})
			else {
                let temp = team.accounts
                temp.splice(slot, 1)

                setTeam({...team, accounts: temp })
            }
		}
	}

    // const [ testModal, setTestModal ] = React.useState(false)
    // function onModalExit(navPage) {
    //     setTestModal(false)
    // }
    // function onModalClick(navPage) {
    //     setTestModal(false)
    //     onTeam.create()
    // }

	return (
        <section className={`team ${team.id ? 'show' : ''}`}>
            {/* <Modal
                toggle={testModal}

                title='Соглашение'
                desciption='Примите пользовательское соглашение, чтобы создать пати' 
                icon={(<FcRules />)}
                
                nav={[ 'Сука', 'Иди нахуй', 'ГГ тима раков' ]}
                body={[
                    (
                        <div className="modaltext">
                            <h1>Пользовательское соглашение</h1>
                            <section>Иди нахуй</section>
                        </div>
                    ),
                    (
                        <div className="form">
                            <div className="forminputchoice">
                                <label>Выберите</label>
                                <div className="select" data-value="" data-title="&nbsp;">
                                    <ul>
                                        <li data-value="nahui">
                                            <span>Нахуй иди</span>
                                        </li>
                                        <li data-value="sam">
                                            <span>Сам иди нахуй</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                ]}
                buttons={['Ладно', 'Сам пошел']}
                
                onClose={onModalExit}
                onClick={onModalClick}/> */}
            {!team.id ? (
                <div className="create">
                    <button className="btn" onClick={() => onTeam.create()}>Создать группу</button>
                </div>
            ) : (
                <>
                    <div className="list">
                        {new Array(5).fill(0).map((item, i) => {
                            if(i >= team.accounts.length)return (
                                <div onClick={() => setTeamAddAccount(i)} className="item empty">
                                    <IoIosAdd />
                                </div>
                            )

                            return (
                                <div className="item">
                                    <Avatar image={team.accounts[i].avatar.image} type='min' size={team.accounts[i].avatar.size} position={team.accounts[i].avatar.position} />
                                    {team.host.id === props.account.id ? (
                                        <div className="delete" onClick={() => onTeam.delete(i)}>
                                            <MdDeleteOutline />
                                        </div>
                                    ) : ''}
                                </div>
                            )
                        })}
                    </div>
                    <div className="leave">
                        <button className="btn" onClick={() => onTeam.leave()}>Покинуть группу</button>
                    </div>
                    <FriendsModal
                        invite={true}
                        teamAccounts={team.accounts}

                        hideAll={true}
                        hideAwait={true}
                        hideAction={true}
                        
                        openedElement='#nav .team .list .item'
                        toggleStatus={teamAddAccount != -1 ? true : false}

                        friendsList={props.friends}
                        typeCount={[props.friends[0].length, 0, 0]}

                        onHide={() => setTeamAddAccount(-1)}
                        onFriendInvited={slot => onTeam.add(props.friends[0][slot])} />
                </>
            )}
        </section>
	)
}