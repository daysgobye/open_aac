import PWABadge from "@/components/common/PWABadge/PWABadge"
import { Tab, TabGroup } from "@/components/common/tab"
import { getLibary } from "@/lib/libary"
import { SpeachSynth } from "@/lib/speachSynth"
import Modal from "@/components/common/modal"
import { useState } from "react"
const libary = getLibary()
const synth = new SpeachSynth()
function App() {
  const [openWordModal, setOpenWordModal] = useState(false),
    [openWordModalCatagory, setOpenWordModalCatagory] = useState("")
  return (
    <>
      <TabGroup className="text-2xl	">
        {
          libary.data.categories.map((catagory, index) => (
            <Tab name={`${catagory.titleEmoji} ${catagory.titleText}`} defaultChecked={index === 0} key={`tab-${index} `} tabClassName="text-3xl	m-4	p-8  border-transparent	 min-h-fit	" className="">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

                {catagory.words.map(word => (
                  <button className="btn text-3xl	min-h-fit	" onClick={() => synth.speak(word.speach)}>
                    {word.displayEmoji}
                    <br />
                    {word.displayText}
                  </button>

                ))}
                <button className="btn text-3xl	min-h-fit	" onClick={() => {
                  setOpenWordModal(true)
                  setOpenWordModalCatagory(catagory.titleText)
                }}>
                  ⚙️➕
                  <br />
                  Add word
                </button>
              </div>

            </Tab>
          ))
        }
        <Tab name={`⚙️ settings`} defaultChecked={false} tabClassName="text-3xl	m-4	p-8  border-transparent	 min-h-fit	" className="">
          <h2>settings</h2>
        </Tab>
      </TabGroup>
      <Modal title={`Add New Word`} openModal={openWordModal} closeModal={() => {
        setOpenWordModal(false)
        setOpenWordModalCatagory("")
      }}>
        add word to {openWordModalCatagory}
      </Modal>
      <PWABadge />
    </>
  )
}

export default App
