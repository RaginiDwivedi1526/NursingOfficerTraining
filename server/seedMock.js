const Test = require('./models/Test');

const seedPsychiatryMock = async () => {
  try {
    const aiimsTest = {
      title: "AIIMS NORCET - Psychiatry Mock Test 1",
      topic: "AIIMS CRE & NORCET",
      difficulty: "hard",
      duration: 30, // mins
      examType: "nursing_officer",
      questions: [
        {
          questionText: "The nurse in the outpatient mental health clinic is evaluating the effectiveness of the treatment regimen for a client with dependent personality disorder. Which of the following statements by the client would indicate that the treatment regimen has been effective?",
          options: [
            "\"I took the bus here today because my parents could not drive me.\"",
            "\"I appreciate all the time you have spent trying to help me feel better.\"",
            "\"I know I am not good at my job because I made a mistake at work today.\"",
            "\"I plan to stay with my cousin while my parents go away on vacation next week.\""
          ],
          correctAnswer: 0,
          explanation: "Clients with dependent personality disorder have an extreme need to be taken care of by another person, cannot make decisions on their own, and have intense fear of separation and being left alone. The ability to make decisions and act on one's own indicate progress toward a therapeutic outcome.",
          topic: "Mental Health (Psychiatric) Nursing"
        },
        {
          questionText: "The nurse in the emergency department is caring for a client who has facial lacerations, a suspected fracture of the arm, and multiple bruises at various stages of healing. The client's spouse is at the bedside and appears angry. Which of the following actions would be a priority for the nurse take?",
          options: [
            "Recommend a referral to social services for the client.",
            "Talk with the client privately without the spouse in the room.",
            "Place the client's arm in a shoulder sling and prepare the client for an x-ray.",
            "Cleanse the client's facial lacerations and prepare to assist with suture placement."
          ],
          correctAnswer: 1,
          explanation: "Intimate partner violence (IPV) is physically, emotionally, verbally, sexually, or economically abusive behavior inflicted by one partner against the other in an intimate relationship to maintain power and control. If IPV is suspected, the nurse should first interview the client in a private setting without the suspected abuser.",
          topic: "Mental Health (Psychiatric) Nursing"
        },
        {
          questionText: "The nurse is assessing a client with posttraumatic stress disorder. Which of the following findings would the nurse expect to observe?",
          options: [
            "increased energy levels and euphoric mood",
            "feelings of paranoia and auditory hallucinations",
            "reliving of the event and detachment from others",
            "excessive need for admiration and inflated self-importance"
          ],
          correctAnswer: 2,
          explanation: "Posttraumatic stress disorder (PTSD) is a reaction to a traumatic event in which physical integrity or sense of self was threatened or harmed. Major features of PTSD include experiencing increased anxiety/emotional arousal, avoiding reminders of the trauma, and reexperiencing the traumatic event.",
          topic: "Mental Health (Psychiatric) Nursing"
        },
        {
          questionText: "The nurse is caring for a client with major depressive disorder. The nurse notes that the client does not move for prolonged periods and responds slowly in conversation. Which of the following actions should the nurse take?",
          options: [
            "Avoid periods of silence when talking with the client.",
            "Use simple phrases and allow time for the client to think and respond.",
            "Teach the client about journaling and meditation for stress management.",
            "Ensure that the client eats the entire meal at breakfast, lunch, and dinner."
          ],
          correctAnswer: 1,
          explanation: "Clients with major depressive disorder may experience deficits in cognitive function, speech, and motor movement, including delayed movement and speech and poor concentration. The nurse should use simple phrases and allow time for the client to respond.",
          topic: "Mental Health (Psychiatric) Nursing"
        },
        {
          questionText: "The nurse is caring for a client with schizophrenia who is crying and no longer wearing the hat that the client usually wears. The client states, 'I cannot find my hat. The cracks on my head will start leaking if I do not have my hat.' Which of the following responses would be appropriate for the nurse to make?",
          options: [
            "\"There are no cracks on your head and there is nothing to worry about.\"",
            "\"Would you like my assistance searching for your missing hat?\"",
            "\"Playing a card game in the activity room will help you feel better.\"",
            "\"How long have you had the cracks on your head?\""
          ],
          correctAnswer: 1,
          explanation: "Delusions are false beliefs that the client strongly believes are true. Although a delusion is false, the client experiences real anxiety. When caring for a client experiencing delusions and anxiety, the nurse should prioritize interventions that will reduce the anxiety (eg, helping find a lost item).",
          topic: "Mental Health (Psychiatric) Nursing"
        }
      ]
    };

    await Test.deleteMany({ title: "AIIMS NORCET - Psychiatry Mock Test 1" });
    await Test.create(aiimsTest);
    console.log('✅ AIIMS Psychiatry Mock Test seeded successfully with real UWorld questions!');
  } catch (err) {
    console.error('Failed to seed mock test', err);
  }
};

module.exports = seedPsychiatryMock;
